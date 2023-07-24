# Drag-n-crop

[Drag-n-crop](https://drag-n-crop.web.app) is a web application for cropping images and videos.
<br />
It can handle various file formats and sizes, with images up to 100 MB and videos up to 1 GB.

![Drag and crop landing page](https://i.imgur.com/FMiiPss.png)

## Tech stack

| Frontend &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Backend |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [Svelte](https://svelte.dev)                                                                                                                              |                                                                                                                              [Rust](https://www.rust-lang.org) |
| [Flowbite](https://flowbite-svelte.com)                                                                                                                   |                                                                                                                                    [Rocket](https://rocket.rs) |
| [JCrop](https://jcrop.com)                                                                                                                                |                                                                                                                               [FFMpeg](https://www.ffmpeg.org) |
## Limitations
| File type | Size  | Format                              |
| --------- | ----- | ----------------------------------- |
| image     | 100MB | jpg, jpeg, png, gif, bmp, webp, svg |
| video     | 1GB   | mp4, mkv, flv, avi, mov, wmv, webm  |

## How to run locally
0. Run the [backend](https://github.com/DoubleDebug/drag-n-crop-be) locally.
1. Install yarn using the following command: `npm i -g corepack`
2. Clone this repository
3. Run `yarn` in root folder
4. Run `yarn dev` in root folder

## Change log
- **version 1.1 ( ??? )**
  - [ ] upload from URL
  - [ ] support for longer videos
  - [ ] user feedback section
- **version 1.0 (Jul 18, 2023)**
  - [x] upload file
  - [x] crop image
  - [x] crop video
  - [x] download result
  - [x] light / dark theme
