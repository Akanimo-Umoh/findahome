import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import bedroomIcon from "@/assets/agentImages/icon-bedrooms.svg";
import bathroomIcon from "@/assets/agentImages/icon-bathrooms.svg";
import UploadImages from "./UploadImages";
import UploadDocuments from "./UploadDocuments";
import UploadVideo from "./UploadVideo";
// import SubmissionSuccessful from "./SubmissionSuccessful";

export default function Step3() {
  return (
    <div>
      <form action="">
        <p>Property Features</p>

        {/* property details */}
        <div className="flex items-center justify-between gap-4 mt-2">
          {/* bedrooms */}
          <div className="w-full">
            <Select>
              <SelectTrigger className="addPropTypeFeatures">
                <div className="flex items-center gap-1">
                  <img src={bedroomIcon} alt="" />
                  <SelectValue placeholder="Bedrooms" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Abia</SelectItem>
                <SelectItem value="land">Adamawa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* bathrooms */}
          <div className="w-full">
            <Select>
              <SelectTrigger className="addPropTypeFeatures">
                <div className="flex items-center gap-1">
                  <img src={bathroomIcon} alt="" />
                  <SelectValue placeholder="Bathrooms" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Abia</SelectItem>
                <SelectItem value="land">Adamawa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* description */}
        <div className="mt-6">
          <label htmlFor="description" className="text-[14px]">
            Description
          </label>
          <div className="py-1 px-2 border border-bg-accent rounded-lg mt-2">
            <textarea
              name=""
              id="description"
              rows={5}
              className="text-[12px] leading-4 w-full outline-none hideScroll"
              placeholder="Start typing..."
            />
          </div>
        </div>

        {/* upload images */}
        <div className="mt-6">
          <p>Upload Photos $ Videos</p>

          <div className="mt-5">
            {/* images */}
            <div>
              <UploadImages />
            </div>

            {/* legal document */}
            <div className="mt-12">
              <UploadDocuments />
            </div>

            {/* video */}
            <div className="mt-12">
              <UploadVideo />
            </div>
          </div>
        </div>

        <div className="text-[14px] font-raleway font-semibold tracking-[1px] space-y-4 mt-11">
          <button
            type="submit"
            className="rounded-lg h-[45px] button-style text-white w-full"
          >
            Submit
          </button>

          <button className="rounded-lg border border-text-secondary bg-button-disabled h-[45px] w-full">
            Save as draft
          </button>
        </div>
      </form>

      {/* this is the successful component */}
      {/* <SubmissionSuccessful /> */}
    </div>
  );
}
