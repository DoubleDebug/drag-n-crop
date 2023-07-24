# Drag-n-crop

[Drag-n-crop](https://drag-n-crop.web.app) is a web application for cropping images and videos.
<br />
It can handle various file formats and sizes, with images up to 100 MB and videos up to 1 GB.

![Drag and crop landing page](https://i.imgur.com/FMiiPss.png)

## Tech stack

| Frontend &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Backend |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [Svelte](https://svelte.dev)                 |       [Rust](https://www.rust-lang.org) |
| [Typescript](https://www.typescriptlang.org) |             [Rocket](https://rocket.rs) |
| [Flowbite](https://flowbite-svelte.com)      | [Firebase](https://firebase.google.com) |
| [JCrop](https://jcrop.com)                   |        [FFMpeg](https://www.ffmpeg.org) |

## Limitations
| File type | Size  | Format                              |
| --------- | ----- | ----------------------------------- |
| image     | 100MB | jpg, jpeg, png, gif, bmp, webp, svg |
| video     | 1GB   | mp4, mkv, flv, avi, mov, wmv, webm  |

## How to run locally
*(Prerequisite)* Run the [backend](https://github.com/DoubleDebug/drag-n-crop-be) locally.
<br />
*(Prerequisite)* Install [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable).
1. Clone this repository
2. Run `yarn` in root folder
3. Run `yarn dev` in root folder
4. Navigate to http://localhost:5173.

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
