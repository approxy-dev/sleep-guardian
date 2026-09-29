<#
.SYNOPSIS
  Rebuilds the website's brand image set from the SleepGuardian project's own
  assets. The shapes and colours here are NOT invented for the web: they are
  measured from the shipped `assets/app.ico` and from the drawing code in
  `tools/GenerateIcons/Program.cs` of the app repository.

  Geometry recovered from assets/app.ico (256px frame, alpha bounding box + colour probe):
    crescent body  : circle centre (143, 121) r 73   fill #FFD878
    crescent cut   : circle centre (182,  81) r 73   fill #141A30  (the app's "night" colour)
    solid backing  : union of both circles, filled #141A30
  tools/GenerateIcons/Program.cs uses the same construction with a 78px radius on a
  256 design space, which is why the app tray icon reads as the same crescent.

  Usage:  powershell -NoProfile -ExecutionPolicy Bypass -File ./tools/extract-brand-assets.ps1
#>

[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [string] $AppRepo,

  [string] $OutDir
)

# $PSScriptRoot is not populated while param defaults are evaluated, so resolve it here.
if (-not $OutDir) { $OutDir = Join-Path $PSScriptRoot '..\public' }
$OutDir = [System.IO.Path]::GetFullPath($OutDir)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$brandDir = Join-Path $OutDir 'brand'
$ogDir    = Join-Path $OutDir 'og'
New-Item -ItemType Directory -Force -Path $brandDir, $ogDir | Out-Null

# --- brand palette (from tools/GenerateIcons/Program.cs + assets/app.ico) -----
$Night   = [System.Drawing.Color]::FromArgb(255, 0x14, 0x1A, 0x30) # #141A30 icon backing
$Moon    = [System.Drawing.Color]::FromArgb(255, 0xFF, 0xD8, 0x78) # #FFD878 crescent
$Amber   = [System.Drawing.Color]::FromArgb(255, 0xFF, 0xB7, 0x4D) # #FFB74D Brand.xaml AmberAccent
$Graphite= [System.Drawing.Color]::FromArgb(255, 0x53, 0x56, 0x5A) # #53565A Brand.xaml SilverDark
$Platinum= [System.Drawing.Color]::FromArgb(255, 0xE5, 0xE4, 0xE2) # #E5E4E2 Brand.xaml SilverHighlight
$Silver  = [System.Drawing.Color]::FromArgb(255, 0xC0, 0xC0, 0xC0) # #C0C0C0 Brand.xaml SilverPrimary
$Ink     = [System.Drawing.Color]::FromArgb(255, 0x2E, 0x31, 0x35) # #2E3135 Brand.xaml TextPrimary

# --- 1. copy the shipped icon frames out of the .ico --------------------------
$icoPath = Join-Path $AppRepo 'assets\app.ico'
if (-not (Test-Path -LiteralPath $icoPath)) { throw "Not found: $icoPath" }

$bytes  = [System.IO.File]::ReadAllBytes($icoPath)
$frames = [BitConverter]::ToUInt16($bytes, 4)

for ($i = 0; $i -lt $frames; $i++) {
  $o   = 6 + (16 * $i)
  $dim = if ($bytes[$o] -eq 0) { 256 } else { [int]$bytes[$o] }
  $len = [BitConverter]::ToUInt32($bytes, $o + 8)
  $off = [BitConverter]::ToUInt32($bytes, $o + 12)

  foreach ($size in 32, 64, 128, 256) {
    if ($dim -ne $size) { continue }
    $slice = $bytes[$off..($off + $len - 1)]
    $ms  = New-Object System.IO.MemoryStream (, $slice)
    $img = [System.Drawing.Image]::FromStream($ms)
    $img.Save((Join-Path $brandDir "app-$size.png"), [System.Drawing.Imaging.ImageFormat]::Png)
    $img.Dispose(); $ms.Dispose()
    Write-Host "  brand/app-$size.png"
  }
}

Copy-Item -LiteralPath $icoPath -Destination (Join-Path $OutDir 'favicon.ico') -Force
Write-Host '  favicon.ico'

# --- 2. apple-touch-icon: 256 frame composited onto the app's night colour ----
function New-CompositeIcon {
  param([string] $Source, [int] $Size, [string] $Destination)
  $src  = [System.Drawing.Image]::FromFile($Source)
  $bmp  = New-Object System.Drawing.Bitmap $Size, $Size, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g    = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode   = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.Clear($Night)
  $g.DrawImage($src, 0, 0, $Size, $Size)
  $bmp.Save($Destination, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose(); $src.Dispose()
  Write-Host "  $(Split-Path -Leaf $Destination)"
}

New-CompositeIcon -Source (Join-Path $brandDir 'app-256.png') -Size 180 `
  -Destination (Join-Path $OutDir 'apple-icon.png')

# --- 3. OpenGraph / Twitter card ----------------------------------------------
function New-SocialCard {
  param([string] $Destination)

  $w = 1200; $h = 630
  $bmp = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g   = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
  $g.Clear($Night)

  # Amber glow derived from the app's AmberAccent.
  for ($i = 14; $i -ge 1; $i--) {
    $a = [int](10 - $i * 0.55)
    $glow = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb($a, 0xFF, 0xB7, 0x4D))
    $g.FillEllipse($glow, 640 - ($i * 16), 315 - ($i * 16), ($i * 32), ($i * 32))
    $glow.Dispose()
  }

  # Vertical hairline in Brand.xaml SilverDark, the app's structural grey.
  $rule = New-Object System.Drawing.SolidBrush $Graphite
  $g.FillRectangle($rule, 80, 96, 1, 438)
  $rule.Dispose()

  $uiBold   = New-Object System.Drawing.Font 'Segoe UI', 62, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)
  $uiReg    = New-Object System.Drawing.Font 'Segoe UI', 27, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
  $uiSemi   = New-Object System.Drawing.Font 'Segoe UI', 23, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)
  $mono     = New-Object System.Drawing.Font 'Consolas', 25, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)

  $moonB = New-Object System.Drawing.SolidBrush $Moon
  $amberB = New-Object System.Drawing.SolidBrush $Amber
  $silverB = New-Object System.Drawing.SolidBrush $Silver
  $platinumB = New-Object System.Drawing.SolidBrush $Platinum
  $inkB = New-Object System.Drawing.SolidBrush $Ink

  $x = 120

  # eyebrow
  $g.DrawString('APPROXY  ·  WINDOWS', $uiSemi, $amberB, $x, 128)
  $g.FillRectangle($amberB, $x, 182, 56, 3)

  # headline
  $g.DrawString('Your PC will not let you', $uiBold, $platinumB, $x, 214)
  $g.DrawString('stay up.', $uiBold, $moonB, $x, 286)

  # sub
  $g.DrawString('It shuts down at bedtime and stays down until morning.', $uiReg, $silverB, $x, 404)

  # footer strip
  $g.FillRectangle($silverB, $x, 494, 40, 1)
  $g.DrawString('SleepGuardian', $uiSemi, $platinumB, $x, 508)
  $g.DrawString('22:00  >  06:00', $mono, $amberB, 470, 508)

  # crescent mark, same construction as assets/app.ico
  $s = 1.9
  $gc = [System.Drawing.Graphics]$g
  $body = New-Object System.Drawing.SolidBrush $Moon
  $cut  = New-Object System.Drawing.SolidBrush $Night
  $gc.FillEllipse($body, 800 - 73 * $s, 200 - 73 * $s, 146 * $s, 146 * $s)
  $gc.FillEllipse($cut,  839 - 73 * $s, 160 - 73 * $s, 146 * $s, 146 * $s)

  $bmp.Save($Destination, [System.Drawing.Imaging.ImageFormat]::Png)

  foreach ($b in $body, $cut, $moonB, $amberB, $silverB, $platinumB, $inkB) { $b.Dispose() }
  foreach ($f in $uiBold, $uiReg, $uiSemi, $mono) { $f.Dispose() }
  $g.Dispose(); $bmp.Dispose()
  Write-Host "  $(Split-Path -Leaf $Destination)"
}

New-SocialCard -Destination (Join-Path $ogDir 'opengraph-image.png')
Write-Host 'Brand assets rebuilt.'
