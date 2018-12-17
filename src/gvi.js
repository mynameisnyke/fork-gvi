const videoIntelligence = require('@google-cloud/video-intelligence');
const client = new videoIntelligence.VideoIntelligenceServiceClient();
const fs = require('fs');
const util = require('util');


async function analyzeLabel(post) {

    const readFile = util.promisify(fs.readFile);
    const file = await readFile(post.filePath);
    const inputContent = file.toString('base64');

    const request = {
        inputContent: inputContent,
        features: ['LABEL_DETECTION'],
    };

    const [operation] = await client.annotateVideo(request);
    console.log('Waiting for operation to complete...');
    const [operationResult] = await operation.promise();

    const annotations = operationResult.annotationResults[0]
    const labels = annotations.segmentLabelAnnotations;
    const tags = []
    labels.forEach(label => {
        tags.push(label.entity.description)
    })

    return tags;
}

module.exports.analyzeLabel = analyzeLabel;