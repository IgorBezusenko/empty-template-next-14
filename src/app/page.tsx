"use client"
import {Input} from "@/components/ui/input";
import {Calendar} from "@/components/ui/calendar";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {DatePickerWithRange} from "@/components/common/DatePickerWithRange/DatePickerWithRange";
import {useState} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Menu} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {ISO_DATE_FORMAT} from "@/lib/constants";
import {format} from "date-fns";
import {cn} from "@/lib/utils";

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]

export default function Home() {
    const [date, setDate] = useState<{
        from: string | null;
        to: string | null;
    } | undefined>();
    const [singleCalendar, setSingleCalendar] = useState<string | undefined>("");

    const formSchema = z.object({
        username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <Tabs>
            <TabsList className='flex w-full justify-start gap-1 p-0'>
                <TabsTrigger
                    className='px-5 data-[state=active]:rounded-b-none data-[state=active]:shadow-none'
                    value='generalData'
                >
                    main
                </TabsTrigger>
                <TabsTrigger
                    className='px-5 data-[state=active]:rounded-b-none data-[state=active]:shadow-none'
                    value='generalData1'
                >
                    table
                </TabsTrigger>

            </TabsList>

            <TabsContent value='generalData' className='mt-0 w-fit'>
                <div>
                    <h1>h1</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae excepturi fuga ipsa iusto.
                        Alias
                        aperiam beatae culpa distinctio earum iusto minus nostrum numquam similique. Iure nostrum
                        quibusdam
                        reiciendis rerum tenetur.
                    </p>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            className='ml-auto mt-[5px] h-[34px] hover:bg-white hover:text-sky-600 hover:shadow-md data-[state=open]:bg-white data-[state=open]:text-sky-600 data-[state=open]:shadow-md'>
                            <Menu className='size-9 p-1'/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className='mt-[-3.75px] min-w-64 border-none data-[state=open]:rounded-tr-none'
                            align='start'
                            side='bottom'
                        >
                            <DropdownMenuRadioGroup
                                className='flex flex-col gap-1'
                                // onValueChange={(value) => {
                                //     if (value === "/catalog") {
                                //         return;
                                //     }
                                //     router.push(value);
                                // }}
                                // value={defaultValue}
                            >


                                <DropdownMenuRadioItem
                                    className='px-3 font-medium data-[state=checked]:bg-slate-500 data-[state=checked]:text-white'
                                    value='/balance'
                                >
                                    balance
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem
                                    className='px-3 font-medium data-[state=checked]:bg-slate-500 data-[state=checked]:text-white'
                                    value='/org-profile'
                                >
                                    org-profile
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem
                                    className='px-3 font-medium data-[state=checked]:bg-slate-500 data-[state=checked]:text-white'
                                    value='/my-profile'
                                >
                                    my-profile
                                </DropdownMenuRadioItem>

                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <h2>Dialog</h2>
                    <Dialog>
                        <DialogTrigger><Button>Open Dialog</Button></DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <h2>Form</h2>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="shadcn" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your public display name.
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                    <h2>Select</h2>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Theme"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>
                    <h2>Input</h2>
                    <Input/>
                    <div className="w-fit">
                        <h2>Calendar</h2>
                        <Calendar/>
                        <h2>DatePicker</h2>
                        <DatePickerWithRange
                            onValueChange={(date) => setDate(date)}
                            value={date}
                        />
                    </div>

                    <h2>Textarea</h2>
                    <Textarea/>
                    <h2>Table</h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Invoice</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((invoice) => (
                                <TableRow key={invoice.invoice}>
                                    <TableCell className="font-medium">{invoice.invoice}</TableCell>
                                    <TableCell>{invoice.paymentStatus}</TableCell>
                                    <TableCell>{invoice.paymentMethod}</TableCell>
                                    <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3}>Total</TableCell>
                                <TableCell className="text-right">$2,500.00</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </TabsContent>
            <TabsContent value='generalData1' className='mt-0'>
                <h2>Calendar single</h2>
                <Popover>
                    <PopoverTrigger asChild>

                        <Button
                            variant='outline'
                            className={cn(
                                "w-full pl-3 text-left font-normal",
                                !singleCalendar && "text-muted-foreground"
                            )}
                        >
                            {singleCalendar ? (
                                format(singleCalendar, ISO_DATE_FORMAT)
                            ) : (
                                <span>chooseDate</span>
                            )}
                            <div className='ml-auto h-4 w-4 opacity-50'/>
                        </Button>

                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar mode='single' onSelect={(v) => {
                            setSingleCalendar(v?.toString())
                        }}/>
                    </PopoverContent>
                </Popover>
                <h2>Table</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Invoice</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((invoice) => (
                            <TableRow key={invoice.invoice}>
                                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                                <TableCell>{invoice.paymentStatus}</TableCell>
                                <TableCell>{invoice.paymentMethod}</TableCell>
                                <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">$2,500.00</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>

            </TabsContent>
        </Tabs>
    );
}
