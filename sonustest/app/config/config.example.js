language: "en-US",
	speech: {
        projectId: '',
        keyFilename: 'keyfile.json',
        keyword: "",
        model: "", // The name of your model
        sensitivity: 0.5, // Keyword getting too many false positives or not detecting? Change this.
        continuous: false // After a keyword is detected keep listening until speech is not heard
    }