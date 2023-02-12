type Some<T> = {
  valid: true;
  value: T;
};

type None = {
  valid: false;
  value?: undefined;
};

type Option<T> = Some<T> | None;

const some = <T>(value: T): Some<T> => ({
  valid: true,
  value,
});

const NONE_OBJECT: None = Object.freeze({
  valid: false,
});
const none = (): None => NONE_OBJECT;

const isSome = <T>(opt: Option<T>): opt is Some<T> => opt.valid;
const isNone = <T>(opt: Option<T>): opt is None => !opt.valid;

const someOrElse = <T>(opt: Option<T>, elseValue: T): T => {
  if (isSome(opt)) {
    return opt.value;
  } else {
    return elseValue;
  }
};

const NONE_VALUE_ACCESS = 'None value accessed';
const someOrError = <T>(opt: Option<T>, errMsg = NONE_VALUE_ACCESS): T => {
  if (isSome(opt)) {
    return opt.value;
  } else {
    throw new Error(errMsg);
  }
};

const ifTrueSome = <T>(predicate: boolean, value: T) =>
  predicate ? some(value) : none();

export type { Option };
export { some, none, isSome, isNone, someOrElse, someOrError, ifTrueSome };
