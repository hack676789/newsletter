import mailchimp from "@mailchimp/mailchimp_marketing";
import { NextResponse } from "next/server";

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY!,
    server: process.env.MAILCHIMP_API_SERVER!,

})

export async function POST(request: Request){
    try {

        const {email} = await request.json()

        if(!email){
            return NextResponse.json(
                {error: "L'adresse e-mail est obligatoire."},
                {status: 400}
            )
        }
        
        const res = await mailchimp.lists.addListMember(
            process.env.MAILCHIMP_AUDIENCE_ID!,
            {email_address:email , status:"subscribed"}
        )

        return NextResponse.json({
            message: "L'adresse a été inscrite avec succès." , data : res
        },{
            status: 201
        }
    )
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error: "Cette adresse e-mail est déja abonnée ou n'existe pas."
        },{
            status: 500
        }
    )
    }
}