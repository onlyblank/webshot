# webshot
 
API для создания скриншотов веб-страниц.

### Endpoints
 
- POST /screenshot

```
body: {
    url: string,
    clipSelector?: string,
    waitForEvent?: string
}
```
 - url: Адрес существующей страницы. Должен начинаться с протокола.

Пример: `https://google.com`

 - clipSelector: DOM селектор элемента, скриншот которого необходимо сделать. Если не указан, делается скриншот всей страницы (работает нестабильно).

Пример: `#index_login`

 - waitForEvent: Событие объекта `window`, после которого будет сделан скриншот. По умолчанию скриншот делается после события `DOMContentLoaded`. Можно передавать кастомные события.
  
Пример: `mycustomevent`