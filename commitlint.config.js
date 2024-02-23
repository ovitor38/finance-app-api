export default {
    parserPreset: {
        parserOpts: {
            headerPattern: /^\[(\w+)-(\d+)\]\((\w+)\): (.+)$/,
            headerCorrespondence: ["type", "number", "scope", "description"],
        },
    },
    plugins: [
        {
            rules: {
                "type-empty": (parsed) => {
                    const { type, number, scope, description } = parsed;
                    console.log(type, number, scope, description);
                    if (type == null || type == "")
                        return [false, "type must not be empty"];
                    return [true, ""];
                },
                "type-enum": (parsed, _when, expectedValues) => {
                    const { type } = parsed;
                    if (!type || !expectedValues.includes(type))
                        return [false, `type must be one of ${expectedValues}`];
                    return [true, ""];
                },
                "description-min-length": (parsed, _when, expectedValues) => {
                    const { description } = parsed;
                    if (!description || description.length < expectedValues)
                        return [
                            false,
                            `description must not be shorter than ${expectedValues} characters, current length is ${
                                description?.length || 0
                            }`,
                        ];

                    return [true, ""];
                },
                "description-max-length": (parsed, _when, expectedValues) => {
                    const { description } = parsed;
                    if (!description || description.length > expectedValues)
                        return [
                            false,
                            `description must not be longer than ${expectedValues} characters, current length is ${
                                description?.length || 0
                            }`,
                        ];

                    return [true, ""];
                },
            },
        },
    ],
    rules: {
        "type-empty": [2, "never"],
        "type-enum": [2, "always", ["fix", "test", "feat"]],
        "description-min-length": [2, "always", 30],
        "description-max-length": [2, "always", 60],
    },
};
