import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
import hovedlogo from "../../assets/images/logo/hovedlogo-CMYK.jpeg";

export const handleDownloadReportAffected = async (
    affectedId: number,
    affectedList: Array<any>
) => {
    const doc = new jsPDF();

    // Add content to the PDF-document
    doc.setFontSize(30);
    doc.text("Økonomisk rapport", 12, 20);
    doc.setFontSize(18);

    // Add logo to the top right corner
    const logoWidth = 45;
    const logoHeight = 15;
    const margin = 5;
    doc.addImage(
        hovedlogo,
        "JPEG",
        doc.internal.pageSize.getWidth() - logoWidth - margin,
        margin,
        logoWidth,
        logoHeight
    );

    // Create a variable to hold the data to be included in the report
    const affected = affectedList.find(
        (affected: any) => affected.id === affectedId
    );
    const data = [
        [
            affected.id.toString(),
            affected.person.firstName,
            affected.person.lastName,
            affected.person.email || "",
            affected.person.phone || "",
        ],
    ];

    doc.text("Pårørende", 10, 45);
    let finalY = (doc as any).lastAutoTable.finalY;

    // Add the data to the document
    autoTable(doc, {
        startY: margin + logoWidth + 2,
        head: [["ID", "Fornavn", "Etternavn", "E-post", "Telefon"]],
        body: data,
        styles: {
            fillColor: [0, 96, 44], // Green color in RGB format
        },
    });

    // Fetch the soul data from the API
    const responseSouls = await fetch("https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Soul");
    const souls = await responseSouls.json();

    // Add the heading
    doc.text("Passasjer", 10, finalY + 15);

    // Add the soul table to the document
    const soulData = souls.map((soul: any) => {
        return [
            soul.id,
            soul.person.firstName,
            soul.person.lastName,
            soul.person.email,
            soul.person.phone,
        ];
    });

    autoTable(doc, {
        startY: finalY + 20,
        head: [["ID", "Fornavn", "Etternavn", "E-post", "Telefon"]],
        body: soulData,
        headStyles: {
            fillColor: [0, 96, 44], // Green color in RGB format
        },
    });

    // Fetch the hotel data from the API
    const response = await fetch(
        `https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Hotel/${affectedId}`
    );
    const hotels = [await response.json()];

    // Add the heading
    doc.text("Hotell", 10, finalY + 15);

    // Add the hotel table to the document
    let totalCost = 0;
    let hotelTotalCost = 0;
    const hotelData = hotels.map((hotel) => {
        const cost = hotel.costEntries.reduce(
            (total: any, entry: any) => total + entry.amount,
            0
        );
        totalCost += cost;
        return [
            hotel.name,
            hotel.location,
            new Date(hotel.fromDate).toLocaleDateString(),
            new Date(hotel.toDate).toLocaleDateString(),
            `${cost} kr`,
        ];
    });

    hotelData.push(["Total kostnad", "", "", "", `${hotelTotalCost} kr`]);

    autoTable(doc, {
        startY: finalY + 20,
        head: [["Hotell", "Sted", "Fra", "Til", "Kostnad"]],
        body: hotelData,
        headStyles: {
            fillColor: [0, 96, 44],
        },
        columnStyles: {
            4: { halign: "right" },
        },
    });

    // Fetch the transport data from the API
    //const responseTransport = await fetch('https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Transport');
    //const transports = await responseTransport.json();

    //TODO: Fiks database
    const transports = [
        {
            departureDate: new Date(2023, 3, 15),
            type: "Train",
            from: "Oslo",
            to: "Bergen",
            costEntries: [{ amount: 100 }, { amount: 200 }, { amount: 50 }],
        },
        {
            departureDate: new Date(2023, 3, 17),
            type: "Bus",
            from: "Bergen",
            to: "Trondheim",
            costEntries: [{ amount: 75 }, { amount: 150 }],
        },
    ];

    // Calculate the total transport cost
    const totalCostTransport = transports.reduce((total, transport) => {
        return (
            total +
            transport.costEntries.reduce((total, entry) => total + entry.amount, 0)
        );
    }, 0);

    // Add the "Transport" heading
    doc.text("Transport", 10, finalY + 15);

    // Add the transport table to the document
    const transportData = transports.map((transport) => {
        const cost = transport.costEntries.reduce(
            (total, entry) => total + entry.amount,
            0
        );
        const formattedCost = `${cost} kr`;
        return [
            transport.departureDate.toLocaleDateString(),
            transport.type || "",
            transport.from || "",
            transport.to || "",
            formattedCost,
        ];
    });

    // Add a row with the total transport cost
    transportData.push(["Total kostnad", "", "", "", `${totalCostTransport} kr`]);

    autoTable(doc, {
        startY: finalY + 20,
        head: [["Dato", "Type", "Fra", "Til", "Kostnad"]],
        body: transportData,
        headStyles: {
            fillColor: [0, 96, 44],
        },
        columnStyles: {
            4: { halign: "right" },
        },
    });

    // Fetch the funeral data from the API
    //const responseFuneral = await fetch('https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Funeral');
    //const funeral = await responseFuneral.json();

    //TODO: Fiks database. Dummy-data
    const funeral = {
        souls: [
            {
                firstName: "Fornavn",
                lastName: "Etternavn",
                relationship: "Venn",
            },
            {
                firstName: "Fornavn",
                lastName: "Etternavn",
                relationship: "Venninne",
            },
        ],
        startsAt: "2023-04-20T10:30:00Z",
        location: "Sted",
        regards: "Tekst",
        costEntries: [
            {
                description: "Blomster",
                amount: 500,
            },
            {
                description: "Kiste",
                amount: 2000,
            },
        ],
    };

    // Add heading
    doc.text("Begravelse", 10, finalY + 15);

    // Add the funeral table to the document
    const funeralData = funeral.souls.map((soul) => {
        // Parse the ISO date string and format it
        const startsAtDate = new Date(funeral.startsAt);
        const formattedStartsAt = startsAtDate.toLocaleString("nb-NO", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

        // Concatenate the cost entries into a string
        const costEntriesString = funeral.costEntries
            .map((entry) => {
                return `${entry.description}: ${entry.amount} kr`;
            })
            .join("\n");

        return [
            soul.firstName,
            soul.lastName,
            soul.relationship || "",
            formattedStartsAt,
            funeral.location || "",
            funeral.regards || "",
            costEntriesString,
        ];
    });

    // Calculate the total cost
    const totalCostFuneral = funeral.costEntries.reduce(
        (acc, entry) => acc + entry.amount,
        0
    );

    // Add the total cost row to the table
    funeralData.push([
        "Total kostnad",
        "",
        "",
        "",
        "",
        "",
        `${totalCostFuneral} kr`,
    ]);

    autoTable(doc, {
        startY: finalY + 20,
        head: [
            [
                "Fornavn",
                "Etternavn",
                "Relasjon",
                "Dato",
                "Sted",
                "Regards",
                "Kostnader",
            ],
        ],
        body: funeralData,
        headStyles: {
            fillColor: [0, 96, 44],
        },
        columnStyles: {
            //fillColor: [0, 96, 44],
            //6: { halign: "right" },
        },
    });

    // Calculate the total cost from hotel, transport and funeral
    const hotelCost = hotels.reduce((total, hotel) => {
        const cost = hotel.costEntries.reduce(
            (total: any, entry: any) => total + entry.amount,
            0
        );
        return total + cost;
    }, 0);
    totalCost += hotelCost;

    const transportCost = transports.reduce((total, transport) => {
        const cost = transport.costEntries.reduce(
            (total, entry) => total + entry.amount,
            0
        );
        return total + cost;
    }, 0);
    totalCost += transportCost;

    const funeralCost = funeral.costEntries.reduce(
        (total, entry) => total + entry.amount,
        0
    );
    totalCost += funeralCost;

    // Add the total cost table
    autoTable(doc, {
        startY: finalY + 10,
        head: [["Total kostnad for pårørende", `${totalCost} kr`]],
        styles: {
            fillColor: [0, 96, 44],
        },
        columnStyles: {
            0: { halign: "right" },
        },
    });

    // Download the document
    doc.save("report.pdf");
};
