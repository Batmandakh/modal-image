# <modal-image>

[![npm version](https://img.shields.io/npm/v/<PACKAGE_NAME>.svg)](https://www.npmjs.com/package/modal-image) 
[![bundle size](https://img.shields.io/bundlephobia/minzip/<PACKAGE_NAME>.svg)](https://bundlephobia.com/result?p=modal-image) 
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

A lightweight image component for React (drop-in replacement for `<img />`) with functionality to display image in a modal with CSS and opens without re-rendering the original image. Modal-image is a pass-through layer of standard HTML image tag or `<img />` jsx, and accepts all standard properties. So, anyone can start using it hassle free.

Got inspiration to make modal-image from [react-modal-image](https://github.com/aautio/react-modal-image) an implementation of Lightbox (nowadays [Lightbox 2](https://github.com/lokesh/lightbox2)) which is a very popular, nice way to show image on screen without distraction and it's nice to have that functionality for all images on web as native functionality of image content.

## Features 

- 🚀 Tiny bundle size
- ⚛️ Fully typed with TypeScript
- ♿ Accessible and keyboard-friendly — you can close the modal with the Escape or Enter key. Don’t worry, it only works when the modal is open!
- 🧩 Tree-shakeable ESM build
- 🪶 Only depends on beautiful Lucide-React community icon
- 😱 No side effect - carefully planned and designed component and it's CSS

## Installation

1. Install modal-image in your react project with following command

```
npm install modal-image
```

### Usage 

2. Include in your components which has image

```
import ModalImage from 'modal-image';
```

Feel free to use named import for your convenience

```
import { ModalImage as Img } from 'modal-image';
```

3. Start using just like normal `<img />` jsx

```
<ModalImage src='path/to/image.jpg' />
```

If you're using named import

```
import { ModalImage as Img } from 'modal-image';

export function InYourComponent() {
  return (
    <Img src='path/to/image.gif' />
  )
}
```

## Options

On top of normal `<img />` jsx modal-image accept few other optional properties

| Property?                 | Description                                   |
| ------------------------- | --------------------------------------------- |
| noModal                   | Disables modal functionality                  |
| noFitScreen               | Disables image rotation on mobile screen      |
| showDownload              | Enables download button in modal              |
| hideRotate                | Hides rotate button in modal                  |
| backgroundColor / bgColor | Sets modal background color                   |

You can add options as property to modal-image
```
<Img src='some/downloadableImage.jpg' showDownload />
```
Most of the time presence of option is enough or if you prefer verbosity, you could assign boolean values
```
<Img src='again/another/downloadableImage.jpg' showDownload={true} />
```


---

## 📃 License
MIT License

---

## 📚 References
- link to reference
