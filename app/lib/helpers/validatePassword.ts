// export function validatePassword(password: string) {
//   const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&?]).{8,}$/;
//   return pattern.test(password);
// }

export function validatePassword(password: string) {
  const pattern = /^.{6,}$/;
  return pattern.test(password);
}
