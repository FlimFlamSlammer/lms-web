import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";

export const reloadPage = (
    router: AppRouterInstance,
    pathname: string,
    searchParams: ReadonlyURLSearchParams
) => {
    router.replace(pathname + new URLSearchParams(searchParams));
};
