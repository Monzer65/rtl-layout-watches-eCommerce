export function generateInvoiceNumber(): string {
  // Define the prefix and date format
  const prefix = "INV-";
  const dateFormat = "YYYYMMDD";

  // Get the current date
  const currentDate = new Date();

  // Format the date as a string
  const dateString = currentDate.toISOString().slice(0, 10).replace(/-/g, "");

  // Generate a random sequential number
  const sequentialNumber = Math.floor(100000 + Math.random() * 900000);

  // Construct the invoice number
  const invoiceNumber = `${prefix}${dateString}-${sequentialNumber}`;

  return invoiceNumber;
}
