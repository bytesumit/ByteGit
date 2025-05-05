const fs = require("fs").promises;
const path = require("path");
const { S3Client, ListObjectsV2Command, GetObjectCommand } = require("@aws-sdk/client-s3");
const { s3, S3_BUCKET } = require("../config/aws-config");

async function pullRepo() {
  const repoPath = path.resolve(process.cwd(), ".byteGit");
  const commitsPath = path.join(repoPath, "commits");

  try {
    // 🔹 Use `ListObjectsV2Command` to list files in S3
    const data = await s3.send(new ListObjectsV2Command({
      Bucket: S3_BUCKET,
      Prefix: "commits/",
    }));

    const objects = data.Contents || [];

    for (const object of objects) {
      const key = object.Key;
      const commitDir = path.join(commitsPath, path.dirname(key).split("/").pop());

      await fs.mkdir(commitDir, { recursive: true });

      // 🔹 Use `GetObjectCommand` to download files from S3
      const params = { Bucket: S3_BUCKET, Key: key };
      const fileContent = await s3.send(new GetObjectCommand(params));

      // 🔹 Read the file stream and write to local file
      const streamToBuffer = async (stream) => {
        const chunks = [];
        for await (const chunk of stream) {
          chunks.push(chunk);
        }
        return Buffer.concat(chunks);
      };

      const body = await streamToBuffer(fileContent.Body);
      await fs.writeFile(path.join(repoPath, key), body);

      console.log(`Pulled: ${key}`);
    }

    console.log("All commits pulled from S3.");
  } catch (err) {
    console.error("Unable to pull: ", err);
  }
}

module.exports = { pullRepo };
