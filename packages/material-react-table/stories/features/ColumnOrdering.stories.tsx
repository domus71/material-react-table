import { useState } from 'react';
import { type Meta } from '@storybook/react';
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnOrderState,
} from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Column Ordering Examples',
};

export default meta;

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
  },
  {
    header: 'Email Address',
    accessorKey: 'email',
  },
  {
    header: 'Address',
    accessorKey: 'address',
  },
  {
    header: 'City',
    accessorKey: 'city',
  },
  {
    header: 'State',
    accessorKey: 'state',
  },
];

const data = [...Array(100)].map(() => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  address: faker.location.streetAddress(),
  city: faker.location.city(),
  state: faker.location.state(),
}));

export const ColumnOrderingEnabled = () => (
  <MaterialReactTable columns={columns} data={data} enableColumnOrdering />
);

export const ColumnOrderingDisabledPerColumn = () => (
  <MaterialReactTable
    columns={[
      {
        header: 'First Name',
        accessorKey: 'firstName',
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName',
      },
      {
        header: 'Email Address',
        accessorKey: 'email',
      },
      {
        header: 'Address',
        accessorKey: 'address',
      },
      {
        header: 'City',
        accessorKey: 'city',
      },
      {
        header: 'State',
        accessorKey: 'state',
        enableColumnOrdering: false,
      },
    ]}
    data={data}
    enableColumnOrdering
  />
);

export const ColumnOrderingWithSelect = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnOrdering
    enableRowSelection
  />
);

export const ColumnOrderingWithPinning = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnOrdering
    enablePinning
  />
);

export const ColumnOrderingNoDragHandles = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnDragging={false}
    enableColumnOrdering
  />
);

export const ColumnOrderingStateManaged = () => {
  const [columnOrder, setColumnOrder] = useState<MRT_ColumnOrderState>([
    'mrt-row-select',
    ...columns.map((c) => c.accessorKey as string),
  ]);
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      defaultDisplayColumn={{ enableColumnOrdering: true, enableHiding: true }}
      enableColumnOrdering
      enableRowSelection
      state={{ columnOrder }}
      onColumnOrderChange={setColumnOrder}
    />
  );
};
