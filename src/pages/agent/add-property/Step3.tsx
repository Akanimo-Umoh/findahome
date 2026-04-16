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
        <div className="flex flex-col gap-2 mt-6">
          <label htmlFor="apartmentDescription" className="text-[14px]">
            Description
          </label>

          <div className="p-3 border border-text-disabled rounded-xl h-25">
            <textarea
              id="apartmentDescription"
              placeholder="Start typing..."
              className="outline-none text-[12px] w-full h-full"
            ></textarea>
          </div>
        </div>

        {/* upload images */}
        {/* for the land, step 3 would only have upload and videos */}
        <div className="mt-6">
          <p>Upload Photos $ Videos</p>

          <div className="mt-5 mx-4">
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
