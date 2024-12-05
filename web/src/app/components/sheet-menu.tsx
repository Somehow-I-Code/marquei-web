import {
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { jwtDecode } from "jwt-decode";
import {
    Building2,
    CircleUserRound,
    FileStack,
    Folder,
    Home,
    LogOut,
    Wrench,
} from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import LogoutMenu from "./logout-sheet-menu";

async function doLogout() {
    "use server";
    cookies().delete("session");

    redirect("/login");
}

export default async function SheetMenu() {
    // TODO: improve this session related code here
    const session = cookies().get("session")?.value;

    if (!session) {
        return null;
    }

    const decoded = jwtDecode(session) as {
        level: string;
    };

    return (
        <SheetContent>
            <SheetHeader className="flex gap-8">
                <SheetTitle className="flex justify-start items-start text-2xl font-semibold mt-6">
                    Menu
                </SheetTitle>
            </SheetHeader>

            {decoded.level === "USER" && (
                <div className="flex flex-col items-start gap-4 mt-6">
                    <div className="flex items-center gap-2  hover:underline">
                        <Home />
                        <Link href="/">
                            <SheetClose className="font-medium hover:underline">
                                Tela Inicial
                            </SheetClose>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2 font-medium hover:underline">
                        <Folder />
                        <Link href="/new-category">Categorias</Link>
                    </div>

                    <div className="flex items-center gap-2 font-medium">
                        <FileStack />
                        <span>Recursos</span>
                    </div>

                    <div className="flex items-center gap-2 px-8 font-medium hover:underline">
                        <Link href="/new-resource">Novo recurso</Link>
                    </div>

                    <div className="flex items-center gap-2 px-8 font-medium hover:underline">
                        <Link href="/resource-details">Detalhe de recurso</Link>
                    </div>

                    <div className="flex items-center gap-2 font-medium hover:underline">
                        <CircleUserRound />
                        <Link href="/profile">Perfil</Link>
                    </div>
                </div>
            )}

            {decoded.level === "ADMIN" && (
                <div className="flex flex-col items-start gap-4 mt-6">
                    <div className="flex items-center gap-2 font-medium hover:underline">
                        <Home />
                        <Link href="/">
                            <SheetClose className="font-medium hover:underline">
                                Tela Inicial
                            </SheetClose>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2 font-medium hover:underline">
                        <Folder />
                        <Link href="/new-category">Categorias</Link>
                    </div>

                    <div className="flex items-center gap-2 font-medium">
                        <FileStack />
                        <span>Recursos</span>
                    </div>

                    <div className="flex items-center gap-2 px-8 font-medium hover:underline">
                        <Link href="/new-resource">Novo recurso</Link>
                    </div>

                    <div className="flex items-center gap-2 px-8 font-medium hover:underline">
                        <Link href="/resource-details">Detalhe de recurso</Link>
                    </div>

                    <div className="flex flex-col items-start gap-4 mt-12">
                        <div className="flex items-center gap-2 font-medium">
                            <Wrench />
                            <span>Gerenciar perfis</span>
                        </div>

                        <div className="flex items-center gap-2 px-8 font-medium hover:underline">
                            <Link href="/new-profile">Novo perfil</Link>
                        </div>

                        <div className="flex items-center gap-2 px-8 font-medium hover:underline">
                            <Link href="/profiles-list">Lista de perfis</Link>
                        </div>

                        <div className="flex items-center gap-2 font-medium hover:underline">
                            <CircleUserRound />
                            <Link href="/profile">Perfil</Link>
                        </div>
                    </div>
                </div>
            )}

            {decoded.level === "SUDO" && (
                <>
                    <div className="flex flex-col items-start gap-4 mt-6">
                        <div className="flex items-center gap-2 font-medium hover:underline">
                            <Home />
                            <Link href="/">
                                <SheetClose className="font-medium hover:underline">
                                    Tela Inicial
                                </SheetClose>
                            </Link>
                        </div>

                        <div className="flex items-center gap-2 font-medium hover:underline">
                            <Folder />
                            <Link href="/new-category">Categorias</Link>
                        </div>

                        <div className="flex items-center gap-2 font-medium">
                            <FileStack />
                            <span>Recursos</span>
                        </div>

                        <div className="flex items-center gap-2 px-8 font-medium hover:underline">
                            <Link href="/new-resource">Novo recurso</Link>
                        </div>

                        <div className="flex items-center gap-2 px-8 font-medium hover:underline">
                            <Link href="/resource-details">
                                Detalhe de recurso
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-4 mt-12">
                        <div className="flex items-center gap-2 font-medium">
                            <Wrench />
                            <span>Gerenciar perfis</span>
                        </div>

                        <div className="flex items-center gap-2 px-8 font-medium hover:underline">
                            <Link href="/new-profile">Novo perfil</Link>
                        </div>

                        <div className="flex items-center gap-2 px-8 font-medium hover:underline">
                            <Link href="/profiles-list">Lista de perfis</Link>
                        </div>

                        <div className="flex items-center gap-2 font-medium hover:underline">
                            <CircleUserRound />
                            <Link href="/profile">Perfil</Link>
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-4 mt-12">
                        <div className="flex items-center gap-2 font-medium">
                            <Building2 />
                            <span>Empresa</span>
                        </div>
                        <div className="flex items-center gap-2 px-8 font-medium hover:underline">
                            <Link href="/new-company">Nova empresa</Link>
                        </div>
                    </div>
                </>
            )}

            <div className="absolute bottom-12 flex items-center gap-2 font-medium text-red-500 hover:underline">
                <LogOut />
                <LogoutMenu doLogout={doLogout} />
            </div>
        </SheetContent>
    );
}
