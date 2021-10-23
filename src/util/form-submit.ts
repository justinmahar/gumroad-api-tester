import FormData from 'form-data';

const DEFAULT_METHOD = 'POST';

export const submitFormData = (
  formActionUrl: string,
  formData: FormData | string,
  fetchRequestInit: RequestInit = {},
): Promise<any> => {
  return new Promise(
    (resolve: (value?: any | PromiseLike<any> | undefined) => void, reject: (reason?: any) => void) => {
      const mergedFetchRequestInit: any = {
        body: formData,
        method: DEFAULT_METHOD,
        ...fetchRequestInit,
      };

      fetch(formActionUrl, mergedFetchRequestInit)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    },
  );
};

export const submitForm = (
  formActionUrl: string,
  form: HTMLFormElement,
  fetchRequestInit: RequestInit = {},
): Promise<any> => {
  return submitFormData(formActionUrl, new FormData(form), fetchRequestInit);
};

const FormSubmit = {
  submitFormData: submitFormData,
  submitForm: submitForm,
};
export default FormSubmit;
