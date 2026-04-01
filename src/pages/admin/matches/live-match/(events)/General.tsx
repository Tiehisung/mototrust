import { useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/input/Inputs";
import { Button } from "@/components/buttons/Button";
import { shortText } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { EmojiPicker } from "@/components/input/EmojiPicker";
import { IMatch } from "@/types/match.interface";
import { useAction } from "@/hooks/action";
import "@/styles/win2k.css";

interface GeneralEventsTabProps {
  match: IMatch;
}

export function GeneralEventsTab({ match }: GeneralEventsTabProps) {
  const [form, setForm] = useState({ minute: "", description: "" });
  const { handleAction, isLoading } = useAction();

  return (
    <div className="win2k" style={{ padding: 4 }}>
      <div
        className="win2k-groupbox"
        role="form"
        aria-label="Add General Event"
      >
        <legend>Add General Event</legend>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAction({
              method: "PUT",
              uri: `${apiConfig.matches}/live/events`,
              body: {
                matchId: match?._id,
                event: {
                  minute: Number.parseInt(form.minute),
                  description: form.description,
                  title: shortText(form.description),
                  type: "general",
                },
              },
              showToast: true,
            });
          }}
          style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 6 }}
        >
          <div>
            <label className="win2k-label" htmlFor="generalMinutes">
              Minute
            </label>
            <Input
              type="number"
              others={{ min: "0", max: "120" }}
              placeholder="e.g., 35"
              value={form.minute}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, minute: e.target.value }))
              }
              name={"generalMinutes"}
              required
            />
          </div>

          <div>
            <label className="win2k-label" htmlFor="generalDescription">
              Description
            </label>
            <Input
              placeholder="e.g., VAR Review, Penalty Decision, etc."
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              name={"generalDescription"}
            />
          </div>

          <EmojiPicker
            onSelect={(v) =>
              setForm({ ...form, description: form.description + v.value })
            }
            className="overflow-x-auto _hideScrollbar"
          />

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 6, marginTop: 4 }}>
            <button
              type="submit"
              className={`win2k-btn win2k-btn-primary win2k-btn-default ${isLoading ? "win2k-disabled" : ""}`}
              disabled={isLoading}
            >
              <Plus size={12} />
              {isLoading ? "Adding..." : "Add Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
