import Transactions from "./Transactions"
import PageHeader from "@/components/shared/PageHeader"

export default function MyTransactions() {
  return (
    <div className="mb-10 md:pt-6 lg:pt-8">
      {/* header */}
      <PageHeader title="My Transactions" responsive />

      <section className="mt-6">
        <Transactions />
      </section>
    </div>
  )
}
