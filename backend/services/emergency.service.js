import prisma from "../config/prisma.js";

export async function getEmergencyContactsService(householdId) {
    const contacts = await prisma.emergencyContact.findMany({
        where: {
            householdId: Number(householdId)
        },

        orderBy: [
            {
                type: "asc"
            },
            {
                name: "asc"
            }
        ]
    });

    return {
        success: true,
        contacts
    };
}

export async function createEmergencyContactService(
    householdId,
    contactData
) {
    const {
        name,
        phone,
        type,
        notes
    } = contactData;

    if (!name?.trim() || !phone?.trim() || !type?.trim()) {
        return {
            success: false,
            message: "Name, phone number and contact type are required."
        };
    }

    const contact = await prisma.emergencyContact.create({
        data: {
            householdId: Number(householdId),
            name: name.trim(),
            phone: phone.trim(),
            type: type.trim().toUpperCase(),
            notes: notes?.trim() || null
        }
    });

    return {
        success: true,
        message: "Emergency contact created successfully.",
        contact
    };
}

export async function updateEmergencyContactService(
    householdId,
    contactId,
    contactData
) {
    const id = Number(contactId);

    const existingContact =
        await prisma.emergencyContact.findFirst({
            where: {
                id,
                householdId: Number(householdId)
            }
        });

    if (!existingContact) {
        return {
            success: false,
            message: "Emergency contact not found."
        };
    }

    const {
        name,
        phone,
        type,
        notes
    } = contactData;

    const contact = await prisma.emergencyContact.update({
        where: {
            id
        },

       data: {
    ...(name !== undefined && {
        name: String(name).trim()
    }),

    ...(phone !== undefined && {
        phone: String(phone).trim()
    }),

    ...(type !== undefined && {
        type: String(type).trim().toUpperCase()
    }),

    ...(notes !== undefined && {
        notes: notes
            ? String(notes).trim() || null
            : null
    })
}
    });

    return {
        success: true,
        message: "Emergency contact updated successfully.",
        contact
    };
}

export async function deleteEmergencyContactService(
    householdId,
    contactId
) {
    const id = Number(contactId);

    const existingContact =
        await prisma.emergencyContact.findFirst({
            where: {
                id,
                householdId: Number(householdId)
            }
        });

    if (!existingContact) {
        return {
            success: false,
            message: "Emergency contact not found."
        };
    }

    await prisma.emergencyContact.delete({
        where: {
            id
        }
    });

    return {
        success: true,
        message: "Emergency contact deleted successfully."
    };
}