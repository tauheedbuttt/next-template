import Table from "@/components/table/Table"
import { DataProps } from "@/components/table/body/Body"
import { HeaderProps } from "@/components/table/headers"

const Dashboard = () => {

    const headers: HeaderProps[] = [
        {
            field: 'name',
            label: 'Name'
        }
    ]

    const data: DataProps = {
        total: 0,
        pages: 0
    }

    return (
        <div>
            <Table
                headers={headers}
                data={data}
            />
        </div>
    )
}

export default Dashboard