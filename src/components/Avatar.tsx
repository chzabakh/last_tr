import { User, Users } from '@/pages/chatRoom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface AvatarProps {
    currentUser: User,
}

const Avatar: React.FC<AvatarProps> = ({currentUser}) => {

    const [imageURL, setImageURL] = useState<string>()

    useEffect(() => {
        const token = Cookies.get('token')
        const headers = { Authorization: `Bearer ${token}` };
        axios.get(`http://localhost:9000/users/${currentUser.id}/avatar`,{ headers, responseType: "blob"}).then((res) => {
            const url = URL.createObjectURL(res.data);
            setImageURL(url);
        }).catch((err) => {
            console.log(err)
        });
    }, [])


    return (
        <>
        <div className='rounded-full max-w-[50px] max-h-[50px]'>
            <Image src={imageURL || "/place.png"} alt="avatar" width={50} height={50}/>
        </div>
        </>
    )
}

export default Avatar;