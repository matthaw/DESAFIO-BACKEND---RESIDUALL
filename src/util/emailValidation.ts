interface IEmailValid {
  email_address: string;
  domain: string;
  valid_syntax: boolean;
}

function validate(email: string): boolean {
  const splitEmail = email.split('.');

  if (
    splitEmail[splitEmail.length - 1] === 'br' &&
    (splitEmail[splitEmail.length - 2] === 'com' || splitEmail[splitEmail.length - 2] === 'gov')
  ) {
    return true;
  }

  if (splitEmail[splitEmail.length - 1] === 'com' || splitEmail[splitEmail.length - 1] === 'org') return true;

  return false;
}

function emailValidation(email: string[], domain: string): IEmailValid[] {
  if (typeof email === 'string') email = [email];

  return email.map((email) => {
    return {
      email_address: email,
      domain,
      valid_syntax: validate(email),
    };
  });
}

export { emailValidation, IEmailValid };
