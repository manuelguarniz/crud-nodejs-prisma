import app from './app';
import { PROPS } from './config/properties';

const port = PROPS.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
