# Static file server - accessible on LAN / external interfaces
param(
  [int]$Port = 3000,
  [string]$Root = $PSScriptRoot,
  [switch]$LocalOnly
)

$mime = @{
  '.html' = 'text/html; charset=utf-8'
  '.css'  = 'text/css; charset=utf-8'
  '.js'   = 'application/javascript; charset=utf-8'
  '.json' = 'application/json; charset=utf-8'
  '.svg'  = 'image/svg+xml'
  '.png'  = 'image/png'
  '.jpg'  = 'image/jpeg'
  '.jpeg' = 'image/jpeg'
  '.webp' = 'image/webp'
  '.ico'  = 'image/x-icon'
  '.txt'  = 'text/plain; charset=utf-8'
  '.xml'  = 'application/xml; charset=utf-8'
  '.webmanifest' = 'application/manifest+json'
  '.map'  = 'application/json'
}

function Get-LanIPv4 {
  Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue |
    Where-Object {
      $_.IPAddress -notlike '127.*' -and
      $_.IPAddress -notlike '169.254.*' -and
      $_.PrefixOrigin -ne 'WellKnown'
    } |
    Sort-Object { if ($_.InterfaceAlias -match 'Wi-?Fi|WLAN') { 0 } else { 1 } } |
    Select-Object -ExpandProperty IPAddress -Unique
}

$bindHost = if ($LocalOnly) { 'localhost' } else { '+' }
$prefix = "http://${bindHost}:$Port/"

if (-not $LocalOnly) {
  $null = netsh http add urlacl url=$prefix user=Everyone 2>$null
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
try {
  $listener.Start()
} catch {
  Write-Host "Bind all-interfaces failed - falling back to localhost + LAN IPs"
  $listener = New-Object System.Net.HttpListener
  $listener.Prefixes.Add("http://localhost:$Port/")
  foreach ($ip in (Get-LanIPv4)) {
    $p = "http://${ip}:$Port/"
    try { $null = netsh http add urlacl url=$p user=Everyone 2>$null } catch {}
    $listener.Prefixes.Add($p)
  }
  $listener.Start()
}

if (-not $LocalOnly) {
  $ruleName = "ProtectYourCrown-$Port"
  $existing = Get-NetFirewallRule -DisplayName $ruleName -ErrorAction SilentlyContinue
  if (-not $existing) {
    try {
      New-NetFirewallRule -DisplayName $ruleName -Direction Inbound -Protocol TCP -LocalPort $Port -Action Allow -Profile Any -ErrorAction Stop | Out-Null
    } catch {}
  }
}

$lanIps = @(Get-LanIPv4)

Write-Host ""
Write-Host "  Protect Your Crown Beauty.Co"
Write-Host "  Serving $Root"
Write-Host "  Local  -> http://localhost:$Port/"
foreach ($ip in $lanIps) {
  Write-Host "  LAN    -> http://${ip}:$Port/"
}
Write-Host "  Press Ctrl+C to stop"
Write-Host ""

try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $req = $ctx.Request
    $res = $ctx.Response

    $path = [Uri]::UnescapeDataString($req.Url.LocalPath)
    if ($path -eq '/' -or [string]::IsNullOrWhiteSpace($path)) { $path = '/index.html' }

    $relative = $path.TrimStart('/').Replace('/', [IO.Path]::DirectorySeparatorChar)
    $full = [IO.Path]::GetFullPath((Join-Path $Root $relative))

    if (-not $full.StartsWith([IO.Path]::GetFullPath($Root))) {
      $res.StatusCode = 403
      $bytes = [Text.Encoding]::UTF8.GetBytes('Forbidden')
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
      $res.Close()
      continue
    }

    if (-not (Test-Path -LiteralPath $full -PathType Leaf)) {
      $res.StatusCode = 404
      $bytes = [Text.Encoding]::UTF8.GetBytes('Not Found')
      $res.ContentType = 'text/plain; charset=utf-8'
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
      $res.Close()
      continue
    }

    $ext = [IO.Path]::GetExtension($full).ToLowerInvariant()
    $res.ContentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { 'application/octet-stream' }
    $res.Headers.Add('Cache-Control', 'no-cache')
    $bytes = [IO.File]::ReadAllBytes($full)
    $res.ContentLength64 = $bytes.Length
    $res.StatusCode = 200
    $res.OutputStream.Write($bytes, 0, $bytes.Length)
    $res.Close()
  }
}
finally {
  $listener.Stop()
  $listener.Close()
}
