import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shtcut-ui/react';
import React from 'react';
import ActionsTable from './action-table';
import { RolesDataResponse } from '@shtcut/types/workspace';
import { fullFormatDate } from '@shtcut/_shared/constant';

const RolesTable = ({
    onClickViewUser,
    onClickEdit,
    findRolesResponse
}: {
    onClickViewUser: () => void;
    onClickEdit: (type: string, role: RolesDataResponse) => void;
    findRolesResponse: RolesDataResponse[] | undefined;
}) => {
    const headers = ['Roles', 'Last Updated', 'Status', ''];
    return (
        <div>
            <Table className="border mt-6">
                <TableHeader>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableHead key={index} className="text-[#667085] font-normal text-sm">
                                {header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody className=" bg-white border-b cursor-pointer">
                    {findRolesResponse &&
                        findRolesResponse?.map((role) => (
                            <TableRow className=" " key={role?._id}>
                                <TableCell className="font-medium py-4  text-xs">{role?.title}</TableCell>

                                <TableCell className="font-medium text-[#5A5555] text-xs ">
                                    {fullFormatDate(role?.createdAt)}
                                </TableCell>
                                <TableCell className="font-medium text-[#5A5555] text-xs ">Active</TableCell>
                                <TableCell className="font-medium text-[#5A5555] ">
                                    <ActionsTable
                                        onClickViewUser={onClickViewUser}
                                        onClickEdit={() => onClickEdit('edit-role', role)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default RolesTable;
