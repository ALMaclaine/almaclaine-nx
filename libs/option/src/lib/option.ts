type Some<T> = {
  valid: true;
  value: T;
};

type None = {
  valid: false;
  value?: undefined;
};

type Option<T> = Some<T> | None;

type Nullable<T> = T | null | undefined;

const some = <T>(value: T): Some<T> => ({
  valid: true,
  value,
});

const NONE_OBJECT: None = Object.freeze({
  valid: false,
});

function none<T>(): None {
  return NONE_OBJECT;
}

function isSome<T>(opt: Option<T>): opt is Some<T> {
  return opt.valid;
}

function isNone<T>(opt: Option<T>): opt is None {
  return !opt.valid;
}

function someOrElse<T>(opt: Option<T>, elseValue: T): T {
  if (isSome(opt)) {
    return opt.value;
  } else {
    return elseValue;
  }
}

const NONE_VALUE_ACCESS = 'None value accessed';

function someOrError<T>(opt: Option<T>, errMsg = NONE_VALUE_ACCESS): T {
  if (isSome(opt)) {
    return opt.value;
  } else {
    throw new Error(errMsg);
  }
}

function ifTrueSome<T>(predicate: boolean, value: T): Option<T> {
  return predicate ? some(value) : none();
}

function ifTrueSomeElse<T>(predicate: boolean, value: T, elseValue: T): T {
  return predicate ? value : elseValue;
}

function equals<T>(a: Option<T>, b: Option<T>): boolean {
  if (isSome(a) && isSome(b)) {
    return a.value === b.value;
  } else {
    return !!(isNone(a) && isNone(b));
  }
}

function equalsValue<T>(a: Option<T>, b: T): boolean {
  if (isSome(a)) {
    return a.value === b;
  } else {
    return false;
  }
}

function option<T>(value?: Nullable<T>): Option<T> {
  if (value === undefined || value === null) {
    return none();
  }

  return some(value);
}

export type { Option, Nullable };
export {
  some,
  none,
  isSome,
  isNone,
  someOrElse,
  someOrError,
  ifTrueSome,
  ifTrueSomeElse,
  equals,
  equalsValue,
  option,
};
