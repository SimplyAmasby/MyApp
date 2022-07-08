import { fileSystemHelper } from "../utilities/FileSystemHelper";
import { Profile } from "./ProfileTypes";

const PROFILE_FILENAME = 'ProfileData.json';

export class ProfileClient {
    saveProfileDataAsync = async (profile: Profile) => {
        if (!profile) return;
        return await fileSystemHelper.writeFileAsync(JSON.stringify(profile), PROFILE_FILENAME);
    }

    loadProfileDataAsync = async () => {
        const fileString = await fileSystemHelper.readFileAsync(PROFILE_FILENAME);
        return (fileString ? JSON.parse(fileString) : {}) as Profile;
    }
}

export const profileClient = new ProfileClient();