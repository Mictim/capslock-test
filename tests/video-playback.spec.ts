import { test } from "../fixtures/fixture";

const videoPlaybackSections: Array<'Hero' | 'General View'> = [
    "Hero",
    "General View"
]

test.use({
    channel: 'chrome',
})
test.describe('Video Playback Tests', () => {
for (const section of videoPlaybackSections) {
        test(`Validate video playback on ${section} section @video`, async ({ app }) => {
            await app.main.open();
            await app.main.validateVideoPlayback(section, 'pause');
            await app.main.validateVideoPlayback(section, 'play');
        });
    }
});