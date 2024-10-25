import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";

// Table Headers
const TABLE_HEAD = [
  { label: "Name" },
  { label: "Position" },
  { label: "Register Date" },
  { label: "Actions" },
];

const Table = () => {
  interface Internship {
    first_name: string;
    last_name: string;
    position: string;
    register_date: string;
  }

  const [internships, setInternships] = useState<Internship[]>([]);

  // Fetch data from the backend
  useEffect(() => {
    fetch('http://localhost:8001/students')  // Update this URL to match your backend API
      .then(response => response.json())
      .then(data => setInternships(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Card className="h-full w-full max-w-6xl mx-auto dark:bg-[#161A1D] dark:text-white" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <CardHeader floated={false} shadow={false} className="rounded-none" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <div className="pb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Internship List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              List of all Internship submissions in the system
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button size="sm" className="flex items-center gap-3" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              Add Profile
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-auto px-0"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map(({ label }) => (
                <th key={label} className="cursor-pointer p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {label} <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {internships.map((internship, index) => (
              <tr key={index}>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {internship.first_name} {internship.last_name}
                  </Typography>
                </td>
                <td className="p-4">{internship.position}</td>
                <td className="p-4">{internship.register_date}</td>
                <td className="p-4">
                  <Tooltip content="Edit"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <IconButton variant="text"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                      <PencilIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip content="Delete"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <IconButton variant="text" onClick={() => console.log('Delete action triggered')}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                      <TrashIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between p-4"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 1
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Previous</Button>
          <Button variant="outlined" size="sm"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Next</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Table;
