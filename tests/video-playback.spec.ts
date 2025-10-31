import { test } from "../fixtures/fixture";

const videoPlaybackSections: Array<'Hero' | 'General View'> = [
    "Hero",
    "General View"
]

test.use({
    channel: 'chrome',
    video: "on"
})

// Tests for video playback functionality can be executed only with enterprise browser channels.
// Therefore, we set the channel to 'chrome' for this suite.
// It will not work with 'chromium' default channel due to missing codecs in the latter.
test.describe('Video Playback Tests', () => {
for (const section of videoPlaybackSections) {
        test(`Validate video playback on ${section} section @video`, async ({ app }) => {
            await app.main.open();
            await app.main.validateVideoPlayback(section, 'pause');
            await app.main.validateVideoPlayback(section, 'play');
        });
    }
});