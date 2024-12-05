import Header from "@/app/(components)/main/Header";
import TableUser from "@/app/(components)/main/TableUser";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <Header />
      <TableUser />
    </div>
  );
}
