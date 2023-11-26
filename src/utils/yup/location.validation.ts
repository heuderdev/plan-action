import { setLocale } from 'yup';
import traducao from './translation';
import IErrosYup from './IErrosYup';

setLocale(traducao);

export const validatorObject = async (formSchema:any, dados: any) => {
  await formSchema.validate(dados, { abortEarly: false })
    .catch((error:any) => {
      const erros = error.inner.map((err: IErrosYup) => {
        return { message: err.message }
      });
      throw { message: erros };
    });
}