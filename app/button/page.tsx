import { Button } from "@/components/ui/button"

const ButtonPage = () => {
    return (
        <div className="p-4 space-y-4 flex-col max-w-[200px]">
            <Button>Default</Button>
            <Button variant={"primary"}>Primary</Button>
            <Button variant={"primaryOutline"}>Primary outline</Button>
            <Button variant={"secondary"}>Secondary</Button>
            <Button variant={"secondaryOutline"}>Secondary outline</Button>
            <Button variant={"danger"}>Secondary</Button>
            <Button variant={"dangerOutline"}>Secondary outline</Button>
            <Button variant={"super"}>super</Button>
            <Button variant={"superOutline"}>Super Outline</Button>
            <Button variant={"ghost"}>ghost</Button>
            <Button variant={"sidebar"}>sidebar</Button>
            <Button variant={"sidebarActive"}>sidebar active</Button>
        </div>
    )
}

export default ButtonPage