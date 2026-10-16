param(
  [int]$ArtworkMax = 2200,
  [int]$DoodleMax = 1800,
  [int]$ProfileMax = 1200,
  [int]$VideoMax = 1280
)

$ErrorActionPreference = "Stop"

function Convert-ImageSet {
  param(
    [string]$Source,
    [string]$Destination,
    [int]$MaxSize
  )

  New-Item -ItemType Directory -Force -Path $Destination | Out-Null

  Get-ChildItem -File $Source | Where-Object { $_.Extension -match '\.(png|jpe?g|webp)$' } | ForEach-Object {
    $slug = $_.BaseName.ToLowerInvariant() -replace '[^a-z0-9]+', '-'
    $slug = $slug.Trim('-')
    $output = Join-Path $Destination "$slug.webp"

    ffmpeg -y -hide_banner -loglevel error -i $_.FullName `
      -vf "scale=w='min(iw,$MaxSize)':h='min(ih,$MaxSize)':force_original_aspect_ratio=decrease" `
      -c:v libwebp -q:v 78 -compression_level 6 $output
  }
}

Convert-ImageSet "assets/artworks" "assets/optimized/artworks" $ArtworkMax
Convert-ImageSet "assets/doodles" "assets/optimized/doodles" $DoodleMax
Convert-ImageSet "assets/profile" "assets/optimized/profile" $ProfileMax

New-Item -ItemType Directory -Force -Path "assets/optimized/timelapses", "assets/optimized/posters" | Out-Null

Get-ChildItem -File "assets/timelapses" -Filter *.mp4 | ForEach-Object {
  $slug = $_.BaseName.ToLowerInvariant() -replace '[^a-z0-9]+', '-'
  $slug = $slug.Trim('-')
  $video = "assets/optimized/timelapses/$slug.mp4"
  $poster = "assets/optimized/posters/$slug.webp"

  ffmpeg -y -hide_banner -loglevel error -i $_.FullName `
    -vf "scale=w='min(iw,$VideoMax)':h='min(ih,$VideoMax)':force_original_aspect_ratio=decrease" `
    -c:v libx264 -preset medium -crf 28 -pix_fmt yuv420p -an -movflags +faststart $video

  ffmpeg -y -hide_banner -loglevel error -ss 0.5 -i $_.FullName -frames:v 1 `
    -vf "scale=w='min(iw,$VideoMax)':h='min(ih,$VideoMax)':force_original_aspect_ratio=decrease" `
    -c:v libwebp -q:v 80 $poster
}

Write-Output "Media optimization complete."
