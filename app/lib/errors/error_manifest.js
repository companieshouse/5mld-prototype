let ErrorManifest = {
  generic: {
    serverError: {
      summary: "Internal server error. Please try again"
    }
  },
  validation: {
    default: {
      summary: "Your request contains validation errors",
      inline: "Your request contains validation errors"
    },
    obligedEntityType: {
      blank: {
        summary: "Select what type of obliged entity you are",
        inline: "Select what type of obliged entity you are"
      }
    },
    fullName: {
      empty: {
        summary: "Enter your full name",
        inline: "Enter your name"
      },
      incorrect: {
        summary: "Full name must only include letters upper and lower case letters, hyphens, spaces and apostrophes",
        inline: "Full name must only include letters upper and lower case letters, hyphens, spaces and apostrophes"
      }
    },
    organisationName: {
        empty: {
            summary: "Enter your organisation name",
            inline: "Enter your organisation name"
        },
        incorrect: {
            summary: "Organisation name must only include upper and lower case letters, hyphens, spaces and apostrophes",
            inline: "Organisation name must only include upper and lower case letters, hyphens, spaces and apostrophes"
        }
    },
    email: {
      blank: {
        summary: "Enter your email address",
        inline: "Enter your email address"
      },
      incorrect: {
        summary: "Email not valid",
        inline: "Enter an email address in the correct format, like name@example.com"
      }
    },
    details: {
      summary: "Enter the information that is incorrect for the PSC",
      inline: "Enter the information that is incorrect for the PSC"
    },
    number: {
      empty: {
        summary: "Enter the company number",
        inline: "Enter the company number"
      },
      incorrect: {
        summary: "Company number must be 8 characters",
        inline: "Company number must be 8 characters"
      },
      doesntExist: {
        summary: "Company number does not exist",
        inline: "Company number does not exist"
      }
    },
    pscName: {
      empty: {
        summary: "Select the PSC with the incorrect information",
        inline: "Select the PSC with the incorrect information"
      }
    }
  }
}

module.exports = ErrorManifest;
