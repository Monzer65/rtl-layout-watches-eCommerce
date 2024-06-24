export function generateInvoiceNumber(lastInvoiceNumber: string): string {
  // Determine the pattern components
  const prefix = "INV-";
  const datePrefix = "YYYYMMDD-";
  const sequentialNumberLength = 3;

  // Extract the sequential number from the last invoice number
  const lastSequentialNumber = parseInt(
    lastInvoiceNumber.slice(lastInvoiceNumber.length - sequentialNumberLength),
    10
  );

  // Generate the new sequential number
  const newSequentialNumber = String(lastSequentialNumber + 1).padStart(
    sequentialNumberLength,
    "0"
  );

  // Construct the new invoice number
  const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const newInvoiceNumber = `${prefix}${currentDate}-${newSequentialNumber}`;

  return newInvoiceNumber;
}
