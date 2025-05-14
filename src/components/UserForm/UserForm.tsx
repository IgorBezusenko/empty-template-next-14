"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { applyServerErrors } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const error = {
  errors: [
    {
      collectionIndex: null,
      propertyName: "Id",
      errorCode: "GreaterThanValidator",
      errorMessage: "'Id' должно быть больше '0'.",
      errorFormat: "'{PropertyName}' должно быть больше '{ComparisonValue}'.",
      formatArguments: {
        ComparisonValue: 0,
        ComparisonProperty: "",
        PropertyName: "Id",
        PropertyValue: 0,
        PropertyPath: "Id"
      }
    },
    {
      collectionIndex: null,
      propertyName: "Name",
      errorCode: "LengthValidator",
      errorMessage:
        "'Name' должно быть длиной от 200 до 400 символов. Количество введенных символов: 4.",
      errorFormat:
        "'{PropertyName}' должно быть длиной от {MinLength} до {MaxLength} символов. Количество введенных символов: {TotalLength}.",
      formatArguments: {
        MinLength: 200,
        MaxLength: 400,
        TotalLength: 4,
        PropertyName: "Name",
        PropertyValue: "Name",
        PropertyPath: "Name"
      }
    },
    {
      collectionIndex: 0,
      propertyName: "Phones[0].Phone",
      errorCode: "LengthValidator",
      errorMessage:
        "'Phone' должно быть длиной от 8 до 20 символов. Количество введенных символов: 7.",
      errorFormat:
        "'{PropertyName}' должно быть длиной от {MinLength} до {MaxLength} символов. Количество введенных символов: {TotalLength}.",
      formatArguments: {
        MinLength: 8,
        MaxLength: 20,
        TotalLength: 7,
        PropertyName: "Phone",
        PropertyValue: "1234567",
        PropertyPath: "Phones[0].Phone",
        CollectionIndex: 0
      }
    },
    {
      collectionIndex: 1,
      propertyName: "Phones[1].Phone",
      errorCode: "LengthValidator",
      errorMessage:
        "'Phone' должно быть длиной от 8 до 20 символов. Количество введенных символов: 6.",
      errorFormat:
        "'{PropertyName}' должно быть длиной от {MinLength} до {MaxLength} символов. Количество введенных символов: {TotalLength}.",
      formatArguments: {
        MinLength: 8,
        MaxLength: 20,
        TotalLength: 6,
        PropertyName: "Phone",
        PropertyValue: "123456",
        PropertyPath: "Phones[1].Phone",
        CollectionIndex: 1
      }
    }
  ],
  code: "validation",
  message: "One or more validation errors occurred"
};

const phoneSchema = z.object({
  Phone: z.string().min(8, "Phone must be at least 8 characters")
});

const formSchema = z.object({
  Id: z
    .number({ invalid_type_error: "Id must be a number" })
    .gt(0, "Id must be greater than 0"),
  Name: z.string().min(2).max(400),
  Phones: z.array(phoneSchema).min(1)
});

type FormSchema = z.infer<typeof formSchema>;

const defaultValues: FormSchema = {
  Id: 1,
  Name: "Alice Smith",
  Phones: [{ Phone: "+123456789" }, { Phone: "+987654321" }]
};

export default function UserForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const { control, handleSubmit } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "Phones"
  });

  const onSubmit = (values: FormSchema) => {
    console.log("Submitted:", values);
    applyServerErrors(error.errors, form.setError);
  };

  return (
    <div className='mx-auto mt-10 max-w-xl p-6'>
      <div>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-6'
          >
            <FormField
              control={form.control}
              name='Id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Id</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='Name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Phones</FormLabel>
              <div className='mt-2 space-y-4'>
                {fields.map((item, index) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name={`Phones.${index}.Phone`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone #{index + 1}</FormLabel>
                        <div className='flex items-center gap-2'>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <Button
                            type='button'
                            variant='destructive'
                            size='sm'
                            onClick={() => remove(index)}
                          >
                            Remove
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <Button
                type='button'
                className='mt-4'
                onClick={() => append({ Phone: "" })}
              >
                Add Phone
              </Button>
            </div>

            <Button
              type='submit'
              className='w-full'
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
