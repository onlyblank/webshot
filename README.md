# taskrenderer
 
Рендерит изображение вопроса для ЭТ.

### Endpoints
 
- POST /task

```
body: {
	"question": string,
	"code": string | null,
	"annotation": string
}
```