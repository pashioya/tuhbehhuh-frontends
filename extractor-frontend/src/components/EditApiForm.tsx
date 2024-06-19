import { Button, FloatingLabel } from "flowbite-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { API } from "../model/API.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApi } from "../hooks/useApi.ts";
import { useContext } from "react";
import ApisContext from "../context/ApisContext.ts";

type EditApiFields = Omit<API, "uuid" | "endpoints">;

const apiSchema: z.ZodType<EditApiFields> = z.object({
    name: z.string(),
    apiKeyParameterName: z.string(),
    apiKey: z.string(),
    vendorUrl: z.string().url(),
    maxRequestsPerDay: z.number().int().positive(),
});

export function EditApiForm() {
    const { currentApi } = useContext(ApisContext);

    const { control, handleSubmit, reset } = useForm<API>({
        resolver: zodResolver(apiSchema),
        defaultValues: {
            name: currentApi?.name,
            maxRequestsPerDay: currentApi?.maxRequestsPerDay,
            apiKeyParameterName: currentApi?.apiKeyParameterName,
            apiKey: currentApi?.apiKey,
            vendorUrl: currentApi?.vendorUrl,
        },
    });
    const { postAPI } = useApi();
    // TODO: Fix the error handling. if max requests changes it sees the input as a string

    const onSubmit = (api: API) => {
        postAPI(api);
        console.log(api);
        reset();
    };
    return (
        <form
            className="flex max-w-md flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Controller
                name={"name"}
                control={control}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => (
                    <FloatingLabel
                        onChange={onChange}
                        value={value}
                        variant="outlined"
                        label={"Api Name"}
                        color={error ? "error" : undefined}
                        required
                    />
                )}
            ></Controller>
            <Controller
                name={"vendorUrl"}
                control={control}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => (
                    <FloatingLabel
                        onChange={onChange}
                        value={value}
                        variant="outlined"
                        label={"Vendor URL"}
                        color={error ? "error" : undefined}
                        required
                    />
                )}
            ></Controller>
            <Controller
                name={"apiKeyParameterName"}
                control={control}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => (
                    <FloatingLabel
                        variant="outlined"
                        label={"Api Key Parameter Name"}
                        value={value}
                        onChange={onChange}
                        color={error ? "error" : undefined}
                        required
                    />
                )}
            ></Controller>
            <Controller
                name={"apiKey"}
                control={control}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => (
                    <FloatingLabel
                        variant="outlined"
                        label={"Api Key"}
                        value={value}
                        onChange={onChange}
                        color={error ? "error" : undefined}
                        required
                    />
                )}
            ></Controller>
            <Controller
                name={"maxRequestsPerDay"}
                control={control}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => (
                    <FloatingLabel
                        type="number"
                        variant="outlined"
                        label={"Max Requests Per Day"}
                        value={value}
                        onChange={onChange}
                        color={error ? "error" : undefined}
                        required
                    />
                )}
            ></Controller>
            <Button type="submit">Edit API</Button>
        </form>
    );
}
