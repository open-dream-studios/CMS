import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { ArchivesEntryImage } from "./Archives";

type MUIGridProps = {
  images: ArchivesEntryImage[];
  currentHeroImg: string;
};
const MUIGrid: React.FC<MUIGridProps> = ({ images, currentHeroImg}) => {
  return (
    <Box
      className="w-[100%] h-[100%] p-[calc(30px+2vw)]"
      sx={{ overflowY: "scroll" }}
    >
      <ImageList variant="masonry" cols={3} gap={22}>
        {images.filter(item => item.url !== currentHeroImg).map((item) => (
          <ImageListItem key={item.url}>
            <img
              // onClick={()=>{}}
              className="cursor-pointer"
              srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.url}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default MUIGrid;
