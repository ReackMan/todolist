describe('addItemForm', () => {
    it('base example, visually looks correct ', async () => {
        // APIs from jest-puppeteer
        await page.goto(
            'http://localhost:9009/iframe.html?id=additemform-component--add-item-form-base-example&viewMode=story',
        )
        const image = await page.screenshot()

        // APIs from jest-image-snapshot
        expect(image).toMatchImageSnapshot()
    })
})
