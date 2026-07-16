import { MvpButton, MvpField, MvpInput, MvpSelect, MvpStatusPill, MvpSurface } from "@/components/mvp/MvpUi";
import {
  activeMvpYearLevel,
  childAvatarOptions,
  getYearLevelAvailabilityMessage,
  isSupportedMvpYearLevel,
  yearLevelOptions,
  type ChildProfile,
} from "@/data/account-types";
import { saveChildProfile } from "@/app/account/actions";

export function ChildProfileSetupForm({
  child,
  mode = "setup",
}: {
  child?: ChildProfile | null;
  mode?: "setup" | "edit";
}) {
  const isEdit = mode === "edit" && Boolean(child);
  const savedUnsupportedYear = Boolean(child && !isSupportedMvpYearLevel(child.yearLevel));
  const yearHelpId = "child-profile-year-help";

  return (
    <MvpSurface className={isEdit ? "border-[#DDE8F5] bg-white" : "overflow-hidden border-[#BDE7D0] bg-gradient-to-br from-white via-[#F8FBFF] to-[#EAFBF0] shadow-playful"}>
      <div className="mb-5">
        <MvpStatusPill tone={isEdit ? "blue" : "yellow"}>{isEdit ? "Edit profile" : "Child setup"}</MvpStatusPill>
        <h2 className="mt-3 text-3xl font-black text-[#082B80]">
          {isEdit ? "Update profile details" : "Create your child profile"}
        </h2>
        <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">
          Use a nickname only. LearnPlay does not need a child legal name, date of birth, school, address, phone number, or precise location for this MVP.
        </p>
      </div>

      <form action={saveChildProfile} className="grid gap-5 md:grid-cols-2">
        <MvpField label="Child nickname" helper="A short nickname is enough for LearnPlay.">
          <MvpInput name="nickname" defaultValue={child?.nickname ?? ""} required maxLength={40} />
        </MvpField>

        <MvpField label="Year level">
          <MvpSelect
            name="year_level"
            defaultValue={child?.yearLevel ?? activeMvpYearLevel}
            required
            aria-describedby={yearHelpId}
          >
            {yearLevelOptions.map((year) => {
              const currentUnsupportedYear = savedUnsupportedYear && child?.yearLevel === year.value;
              const disabled = year.availability !== "active";
              const label = year.availability === "active"
                ? `${year.label} - available now`
                : currentUnsupportedYear
                  ? `${year.label} - saved profile, coming soon`
                  : `${year.label} - coming soon`;

              return (
                <option key={year.value} value={year.value} disabled={disabled} aria-disabled={disabled}>
                  {label}
                </option>
              );
            })}
          </MvpSelect>
          <p id={yearHelpId} className="text-xs font-bold leading-5 text-[#5B6B94]">
            {savedUnsupportedYear
              ? `${getYearLevelAvailabilityMessage(child?.yearLevel ?? activeMvpYearLevel)} Choose Year 1 to use the active MVP lessons.`
              : "Year 1 Mathematics Forest World is available now. Years 2-6 are coming soon."}
          </p>
          {savedUnsupportedYear ? (
            <div className="rounded-[1rem] bg-[#FFF3C4] p-3 text-xs font-black leading-5 text-[#9A6700]" role="status">
              This saved profile has not been changed. To save edits and start active lessons, choose Year 1.
            </div>
          ) : null}
        </MvpField>

        <fieldset className="md:col-span-2">
          <legend className="text-sm font-black text-[#082B80]">Avatar choice</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {childAvatarOptions.map((avatar) => (
              <label key={avatar.value} className="cursor-pointer rounded-[1.25rem] border-2 border-[#DDE8F5] bg-white p-4 transition focus-within:ring-4 focus-within:ring-[#0B63F6]/25 hover:border-[#0B63F6]">
                <input
                  type="radio"
                  name="avatar"
                  value={avatar.value}
                  defaultChecked={(child?.avatar ?? "learnbot") === avatar.value}
                  className="peer sr-only"
                />
                <span className="block text-lg font-black text-[#082B80] peer-checked:text-[#0B63F6]">{avatar.label}</span>
                <span className="mt-1 block text-sm font-bold leading-6 text-[#5B6B94]">{avatar.description}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="md:col-span-2">
          <MvpButton type="submit">{isEdit ? "Save Changes" : "Create Child Profile"}</MvpButton>
        </div>
      </form>
    </MvpSurface>
  );
}
