import { Button, FloatingLabel, ToggleSwitch } from "flowbite-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Endpoint } from "../model/Endpoint";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { useCreateEndpoint } from "../hooks/useCreateEndpoint.ts";
import { Select } from "flowbite-react";
import { useContext } from "react";
import ApisContext from "../context/ApisContext.ts";

type CreateEndpointFields = Omit<Endpoint, "uuid" | "requestParams">;

type RequestParamSchema = {
    parameterKey: string;
    parameterValue: string;
};
// TODO: error when adding new request param. need to fix
// TODO: bad request when creating endpoint. need to fix

const requestParamsSchema: ZodType<RequestParamSchema[]> = z.array(
    z.object({
        parameterKey: z.string(),
        parameterValue: z.string(),
    })
);

const endpointSchema: ZodType<CreateEndpointFields> = z.object({
    apiUUID: z.string(),
    name: z.string(),
    endpointPath: z.string(),
    requestParams: requestParamsSchema,
    active: z.boolean(),
    timeInterval: z.number().int(),
    timeUnit: z.string(),
});

interface CreateEndpointFormProps {
    apiUUID: string;
    onCloseModal: () => void;
}

export function CreateEndpointForm({
    apiUUID,
    onCloseModal,
}: CreateEndpointFormProps) {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Endpoint>({
        resolver: zodResolver(endpointSchema),
        defaultValues: {
            apiUUID: apiUUID,
            name: "",
            endpointPath: "",
            requestParams: [],
            active: false,
            timeInterval: 15,
            timeUnit: "MINUTES",
        },
    });

    const { refetchApis } = useContext(ApisContext);

    const { fields, append, remove } = useFieldArray({
        control,
        name: "requestParams",
    });

    const { createEndpoint } = useCreateEndpoint();
    console.log(errors);
    const onSubmit = (endpoint: Endpoint) => {
        createEndpoint(endpoint);
        console.log(endpoint);
        refetchApis();
        onCloseModal();
        reset();
    };

    return (
        <form
            className="flex max-w-md flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Controller
                name="name"
                control={control}
                render={({
                    field: { value, onChange },
                    fieldState: { error },
                }) => (
                    <FloatingLabel
                        value={value}
                        onChange={onChange}
                        label={"Endpoint Name"}
                        variant="outlined"
                        color={error ? "error" : undefined}
                        required
                    />
                )}
            />
            <Controller
                name="endpointPath"
                control={control}
                render={({
                    field: { value, onChange },
                    fieldState: { error },
                }) => (
                    <FloatingLabel
                        label={"Endpoint Path"}
                        value={value}
                        onChange={onChange}
                        variant="outlined"
                        color={error ? "error" : undefined}
                        required
                    />
                )}
            />
            <Controller
                name="active"
                control={control}
                render={({ field: { value, onChange } }) => (
                    <ToggleSwitch
                        checked={value}
                        label={"Is Active When Created?"}
                        onChange={onChange}
                    />
                )}
            />
            {fields.map((field, index) => {
                return (
                    <section key={field.id} className="flex gap-4">
                        <Controller
                            name={`requestParams.${index}.parameterKey`}
                            control={control}
                            render={({
                                field: { value, onChange },
                                fieldState: { error },
                            }) => (
                                <FloatingLabel
                                    variant="outlined"
                                    label={"Parameter Key"}
                                    value={value}
                                    onChange={onChange}
                                    {...field}
                                    color={error ? "error" : undefined}
                                    required
                                />
                            )}
                        />
                        <Controller
                            name={`requestParams.${index}.parameterValue`}
                            control={control}
                            render={({
                                field: { value, onChange },
                                fieldState: { error },
                            }) => (
                                <FloatingLabel
                                    variant="outlined"
                                    label={"Parameter Value"}
                                    value={value}
                                    onChange={onChange}
                                    {...field}
                                    color={error ? "error" : undefined}
                                    required
                                />
                            )}
                        />
                        <Button onClick={() => remove(index)} color={"red"}>
                            <FaRegTrashAlt />
                        </Button>
                    </section>
                );
            })}

            <Button
                onClick={() => {
                    append({
                        parameterKey: "",
                        parameterValue: "",
                        uuid: "",
                        endpointUuid: "",
                    });
                }}
                label={<FaPlus />}
            />
            <Controller
                name="timeInterval"
                control={control}
                render={({
                    field: { value, onChange },
                    fieldState: { error },
                }) => (
                    <FloatingLabel
                        type="number"
                        variant="outlined"
                        value={value}
                        onChange={onChange}
                        label={"Time Interval"}
                        color={error ? "error" : undefined}
                        required
                    />
                )}
            />
            <Controller
                name="timeUnit"
                control={control}
                render={({
                    field: { value, onChange },
                    fieldState: { error },
                }) => (
                    <Select
                        id="countries"
                        color={error ? "error" : undefined}
                        value={value}
                        onChange={onChange}
                        required
                    >
                        <option value={"SECONDS"}>Seconds</option>
                        <option selected value={"MINUTES"}>
                            Minutes
                        </option>
                        <option value={"HOURS"}>Hours</option>
                        <option value={"DAYS"}>Days</option>
                    </Select>
                )}
            />
            <Button type="submit">Create Endpoint</Button>
        </form>
    );
}
