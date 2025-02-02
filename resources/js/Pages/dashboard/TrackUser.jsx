import { Head, router } from "@inertiajs/react";
import Table from "./Table";
import { useMemo } from "react";

export default function TrackUser({ userRequests }) {
    const data = userRequests;

    const columns = useMemo(
        () => [
            { Header: "ID", accessor: "id" },
            { Header: "Description", accessor: "description" },
            { Header: "Method", accessor: "method" },
            { Header: "Requested at", accessor: "requested_at" },
            { Header: "Payload", accessor: "payload" },
        ],
        []
    );

    return (
        <>
            <Head title="Track User Activity" />

            <Table
                data={data}
                columns={columns}
                title={"User Activity List"}
                checkBox={true}
                actions={{
                    deleteAll: (rows) =>
                        router.post(route("userRequests.delete"), {
                            ids: rows,
                        }),
                }}
            />
        </>
    );
}
TrackUser.header = "Track User Activity";
