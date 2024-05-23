export default async function CustomersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  console.log(query, currentPage);
  // const invoices = await fetchFilteredInvoices(query, currentPage);
  // ...
}
