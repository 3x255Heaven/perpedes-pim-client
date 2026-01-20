import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/shared/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/shared/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/popover";
import { useClientsSearchQueryAll } from "@/hooks/useClients";

type ClientOption = {
  id: string;
  label: string;
};

type Props = {
  value?: ClientOption | null;
  onChange: (value: ClientOption) => void;
};

export function ClientsSearchSelect({ value, onChange }: Props) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  const { data, isFetching } = useClientsSearchQueryAll(debouncedSearch);

  const options: ClientOption[] =
    data?.map((client: any) => ({
      id: client.id,
      label: client.displayName,
    })) ?? [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
        >
          {value ? value.label : "Select client..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search clients..."
            value={search}
            onValueChange={setSearch}
          />

          {isFetching && (
            <div className="px-3 py-2 text-sm text-muted-foreground">
              Searching...
            </div>
          )}

          <CommandEmpty>No clients found.</CommandEmpty>

          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.id}
                value={option.label}
                onSelect={() => {
                  onChange(option);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value?.id === option.id ? "opacity-100" : "opacity-0",
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
