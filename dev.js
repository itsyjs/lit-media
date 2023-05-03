import { GlobalRegistrator } from '@happy-dom/global-registrator'
import { setupMedia, media } from './index.js'

GlobalRegistrator.register()

setupMedia()

console.log(media.get())
